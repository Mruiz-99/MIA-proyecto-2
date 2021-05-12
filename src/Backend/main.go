package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	_ "github.com/godror/godror"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var db *sql.DB
var cuenta_login string

func main() {
	// routes
	router := mux.NewRouter()
	router.HandleFunc("/registrar/", registro).Methods("POST")
	router.HandleFunc("/consulta/", consulta_usuario).Methods("POST")
	router.HandleFunc("/actualizar_usuario/", actualizar_usuario).Methods("POST")
	router.HandleFunc("/cuenta_usuario/", cuenta_usuario).Methods("GET")
	router.HandleFunc("/datos_usuario/", datos_usuario).Methods("GET")

	//Oracle 12c
	database, err := sql.Open("godror", "admin/admin@localhost:1521/ORCLCDB.localdomain")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer database.Close()
	db = database

	// server
	port, defport := os.LookupEnv("GOPORT")

	if !defport {
		port = "4000"
	}
	fmt.Println("Listen on port " + port)
	handler := cors.Default().Handler(router)
	http.ListenAndServe(":"+port, handler)

}

type Usuario struct {
	User             string `json:"usuario"`
	Pass             string `json:"password"`
	Nombre           string `json:"nombre"`
	Apellido         string `json:"apellido"`
	Fecha_nacimiento string `json:"fecha_nacimiento"`
	Fecha_registro   string `json:"fecha_registro"`
	Correo           string `json:"correo"`
	Foto             string `json:"foto"`
}

func registro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user Usuario
	json.NewDecoder(r.Body).Decode(&user)
	var res string
	_, err := db.Exec("CALL SELECT_USER(:1,:2,:3)", user.User, user.Pass, sql.Out{Dest: &res})
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	if res != "" {
		fmt.Println("Error el usuario ya existe")
		json.NewEncoder(w).Encode("Error el usuario ya existe")
		fmt.Println(user.User)

		return
	} else {
		fmt.Println("Su cuenta ha sido creada con exito")
		_, err := db.Exec("CALL INSERT_USER(:1,:2,:3,:4,:5,:6,:7,:8)", user.User, user.Pass, user.Nombre, user.Apellido, user.Fecha_nacimiento, user.Fecha_registro, user.Correo, user.Foto)
		if err != nil {
			fmt.Println("Error running query")
			json.NewEncoder(w).Encode("Error, llene todos los campos solicitados")

			fmt.Println(err)
			return
		}
		json.NewEncoder(w).Encode("Su cuenta ha sido creada con exito")
		return
	}
	//fmt.Println(user.Id + ", " + user.User)
}

func consulta_usuario(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user Usuario
	json.NewDecoder(r.Body).Decode(&user)
	var res string
	_, err := db.Exec("CALL LOGIN(:1,:2,:3)", user.User, user.Pass, sql.Out{Dest: &res})
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	if res != "" {
		json.NewEncoder(w).Encode("Bienvenido: " + user.User)
		cuenta_login = user.User
		return
	} else {
		json.NewEncoder(w).Encode("Error, el usuario o contraseña son incorrectos")
		return
	}
}
func cuenta_usuario(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cuenta_login)
	return
}
func datos_usuario(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var u, p, n, a, nac, reg, c, f string
	_, err := db.Exec("CALL DATOS_USER(:1,:2,:3,:4,:5,:6,:7,:8,:9)", cuenta_login, sql.Out{Dest: &u}, sql.Out{Dest: &p}, sql.Out{Dest: &n}, sql.Out{Dest: &a}, sql.Out{Dest: &nac}, sql.Out{Dest: &reg}, sql.Out{Dest: &c}, sql.Out{Dest: &f})
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	if u != "" {
		json.NewEncoder(w).Encode(u + "," + p + "," + n + "," + a + "," + nac + "," + reg + "," + c + "," + f)
		return
	} else {
		json.NewEncoder(w).Encode("Error, el usuario no fue encontrado")
		return
	}
}

func actualizar_usuario(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user Usuario
	json.NewDecoder(r.Body).Decode(&user)
	var res string
	_, err := db.Exec("CALL SELECT_USER(:1,:2,:3)", user.User, user.Pass, sql.Out{Dest: &res})
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	if res != "" {
		_, err := db.Exec("CALL UPDATE_USER(:1,:2,:3,:4,:5,:6,:7,:8)", user.User, user.Pass, user.Nombre, user.Apellido, user.Fecha_nacimiento, user.Fecha_registro, user.Correo, user.Foto)
		if err != nil {
			fmt.Println("Error running query")
			json.NewEncoder(w).Encode("Error, no se puede guardar ningun campo vacio")
			fmt.Println(err)
			return
		}
		json.NewEncoder(w).Encode("Los datos han sido modificador con exito")
		return
	} else {
		json.NewEncoder(w).Encode("Error, no se ha encontrado la cuenta")
		return
	}
	//fmt.Println(user.Id + ", " + user.User)
}

/*_, err := Database.Exec("CALL LOGIN(:1,:2,:3,:4,:5)", login.User, login.Pass, sql.Out{Dest: &isUser},
sql.Out{Dest: &isAd}, sql.Out{Dest: &idUser})*/

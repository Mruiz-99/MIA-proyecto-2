CREATE OR REPLACE PROCEDURE DATOS_USER
(
    usu IN USUARIO.usuario%TYPE,
    usuario OUT VARCHAR2,
    password OUT VARCHAR2,
    nombre OUT VARCHAR2,
    apellido OUT VARCHAR2,
    nacimiento OUT VARCHAR2,
    registro OUT VARCHAR2,
    correo OUT VARCHAR2,
    foto OUT VARCHAR2
)AS
BEGIN
    SELECT * INTO usuario,password,nombre,apellido,nacimiento,registro,correo,foto FROM USUARIO WHERE USUARIO.usuario = usu ;
END DATOS_USER;
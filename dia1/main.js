const mysql = require ('mysql2/promise');

const connect = async () => { 

    try{
        //conexion con la base de datos
        const connection = await mysql.createConnection({
            hoost: 'localhost',
            user: 'root',
            password: 'codenotch',
            database: 'reto1' 
        });
        console.log("Conexión realizada");

        //consultar a la base de datos
        //Modifica la tabla dirección para añadir una columna y para borrar otra columna
        // const sql = 'ALTER TABLE direccion ADD COLUMN codigo_postal INT NULL AFTER piso;'
        // const sql = 'ALTER TABLE direccion DROP COLUMN codigo_postal';
        
        //Elimina la tabla dirección de forma permanente
        // const sql = 'DROP TABLE direccion';

        //Setear todas las notas de los alumnos a ‘0’
        // const sql = 'UPDATE marks SET mark = 0';

        //Obtener el nombre y el primer apellido de todos los estudiantes.
        // const sql = 'SELECT first_name, last_name FROM students';

        //Obtener todos los datos de los profesores.
        // const sql = 'SELECT * FROM teachers';

        //RETO 2
        //Eliminar de la base de datos todas las notas cuya fecha tenga más de 10 años.
        // const sql = 'DELETE FROM marks WHERE (date < "2013-06-01")';

        //Haz una actualización de los datos en la tabla que corresponda teniendo en cuenta que los
        //profesores va a poner un 5 a los alumnos cuya nota sea inferior a 5.
        const sql = 'UPDATE marks SET mark = "5" WHERE (mark < "5")';
        
        const [result,data] = await connection.execute(sql);
        console.log(result); 

    }
    catch(error){
        console.log(error);
        await connection.end();
    }
}

connect();


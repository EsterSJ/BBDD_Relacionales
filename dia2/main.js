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

        //Consultas a la base de datos

        //RETO 1

        //calcular la nota media de los alumnos de la asignatura 1.
        // const sql = 'SELECT AVG(mark) FROM marks WHERE subject_id = 1;'

        //Calcular el número total de alumnos que hay en el bootcamp.
        // const sql = 'SELECT COUNT(*) AS TotalAlumnos FROM students;'

        //Elimina todas las notas de la base de datos que estén por encima de 5 y que sean del año pasado
        // const sql = 'DELETE FROM marks WHERE (mark > 5) AND (date < "2023-01-01" AND date > "2021-12-31");'

        //Obtén los datos de todos los estudiantes que estén en el bootcamp este año. 
        //Para ello la tabla de estudiantes debe tener un campo que sea el año de ingreso.
        // const sql = 'ALTER TABLE students ADD COLUMN anyo_ingreso INT NULL;'
        // const sql = 'SELECT * FROM students WHERE anyo_ingreso = 2023;'

        //Calcular el numero de profesores que hay por cada asignatura.
        // const sql = 'SELECT COUNT(*) FROM subject_teacher GROUP BY subject_id;'

        //RETO 2
        //Obtén el id y la nota de los alumnos que tengan un id entre 1 y 20, o que tenga una nota
        //mayor de 8 y la nota tenga fecha del año pasado.
        // const sql = 'SELECT student_id, mark FROM marks WHERE (student_id BETWEEN 1 AND 4) OR (mark > 8 AND date BETWEEN "2022-01-01" AND "2023-01-01");'

        //Obtén la media de las notas que se han dado en el último año por asignatura.
        // const sql = 'SELECT AVG(mark) FROM marks WHERE date BETWEEN "2022-01-01" AND "2022-12-31" GROUP BY subject_id';

        //Obtén la media aritmética de las notas que se han dado en el último año por alumno.
        const sql = 'SELECT AVG(mark) FROM marks WHERE date BETWEEN "2022-01-01" AND "2022-12-31" GROUP BY student_id';

        const [result,data] = await connection.execute(sql);
        console.log(result); 

    }
    catch(error){
        console.log(error);
        await connection.end();
    }
}

connect();
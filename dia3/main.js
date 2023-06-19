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

        //RETO 1
        //Obtén los nombres y apellidos de los alumnos y los nombres de las asignaturas en las que están apuntados.
        // const sql = 'SELECT first_name, last_name, title FROM students INNER JOIN grupos ON students.grupos_id = grupos.grupos_id INNER JOIN subject_teacher ON grupos.grupos_id = subject_teacher.grupos_id INNER JOIN subjects ON subjects.subjects_id = subject_teacher.subject_id ORDER BY first_name;'
        
        //RETO 2
        //Obtén todos los nombres y apellidos de los profesores y los nombres de las asignaturas que imparten.
        // const sql = 'SELECT DISTINCT first_name, last_name, title FROM teachers INNER JOIN subject_teacher ON teachers.teacher_id = subject_teacher.teacher_id INNER JOIN subjects ON subjects.subjects_id = subject_teacher.subject_id ORDER BY first_name, last_name';

        //RETO 3
        //Obtén el número total de alumnos por asignatura, el nombre de la asignatura y el nombre y apellidos del profesor que la imparte.
        // const sql = 'SELECT title, COUNT(*) AS n_alumnos, teachers.first_name, teachers.last_name FROM subjects LEFT JOIN subject_teacher ON subjects.subjects_id = subject_teacher.subject_id LEFT JOIN grupos ON subject_teacher.grupos_id = grupos.grupos_id LEFT JOIN students ON students.grupos_id = grupos.grupos_id LEFT JOIN teachers ON teachers.teacher_id = subject_teacher.teacher_id GROUP BY title, teachers.first_name, teachers.last_name';
        
        const [result,data] = await connection.execute(sql);
        console.log(result); 

    }
    catch(error){
        console.log(error);
        await connection.end();
    }
}

connect();


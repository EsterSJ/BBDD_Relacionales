//importar clase alumnos
const alumnos = require ("../models/alumnos");
//importar conexion BBDD
const { pool } = require ("../database");


//RETO 1
async function getAlumnos (req, res){
    
    const params = [req.query.students_id];
    let sql = `SELECT * FROM students;`;

    //si pasamos el id de un alumno traemos solo ese alumno
    if (req.query.students_id != undefined) {
        sql = `SELECT * FROM students WHERE students_id=?`;
    }

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }
}

async function postAlumnos (req, res){

    //recogemos los datos por el body
    const {students_id, first_name, last_name, grupos_id, anyo_ingreso} = req.body;
    const params = [students_id, first_name, last_name, grupos_id, anyo_ingreso];

    //insertamos el nuevo alumno en la tabla
    let sql = `INSERT INTO students (students_id, first_name, last_name, grupos_id, anyo_ingreso) VALUES (?,?,?,?,?);`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }
}

async function putAlumnos (req, res){

    //recogemos los datos por el body
    const {students_id, first_name, last_name, grupos_id, anyo_ingreso} = req.body;

    const params = [
        first_name ? first_name: null,
        last_name ? last_name: null,
        grupos_id ? grupos_id: null,
        anyo_ingreso ? anyo_ingreso: null,
        students_id
    ];

    //modificamos el alumno
    let sql = `UPDATE students SET first_name = COALESCE(?,first_name), last_name = COALESCE(?,last_name), grupos_id = COALESCE(?,grupos_id), anyo_ingreso = COALESCE(?,anyo_ingreso) WHERE students_id = ?`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }
}

async function deleteAlumnos (req, res){

    //recogemos el id del alumno qe queremos eliminar por el body
    const {students_id} = req.body;
    const params = [students_id];

    //borramos el alumno de la tabla students
    let sql = `DELETE FROM students WHERE students_id = ?;`

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }
}

//RETO 2
async function getMedia (req, res){

    //recogemos el id del alumno del que queremos calcular la media
    const params = [req.query.students_id];

    //calculamos la media del alumno pasado por parametro
    if (req.query.students_id != undefined) {
        
        sql = `SELECT AVG(mark) AS mediaAlumno FROM marks WHERE student_id=?`;
    }
  

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }

}

async function getApuntadas (req, res){

    //recogemos el id del alumno del que queremos saber las asignaturas
    const params = [req.query.students_id];
    
    //pedimos la lista de las asignaturas del alumno pasado por parametro
    if (req.query.students_id != undefined) {
        sql = 'SELECT title FROM students INNER JOIN grupos ON students.grupos_id = grupos.grupos_id INNER JOIN subject_teacher ON grupos.grupos_id = subject_teacher.grupos_id INNER JOIN subjects ON subjects.subjects_id = subject_teacher.subject_id WHERE students_id = ?'
    }
    //pedimos todos los alumnos y las asignaturas a las que estan apuntadas
    else{
        sql = 'SELECT first_name, last_name, title FROM students INNER JOIN grupos ON students.grupos_id = grupos.grupos_id INNER JOIN subject_teacher ON grupos.grupos_id = subject_teacher.grupos_id INNER JOIN subjects ON subjects.subjects_id = subject_teacher.subject_id ORDER BY first_name'
    }
  
    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }

}

async function getImpartidas (req, res){

    //recogemos el id del profesor del que queremos saber las asignaturas
    const params = [req.query.teacher_id];
    
    //pedimos la lista de asignaturas que imparte el profesor pasado por parametro
    if (req.query.teacher_id != undefined) {
        sql = 'SELECT first_name, last_name, title FROM teachers INNER JOIN subject_teacher ON teachers.teacher_id = subject_teacher.teacher_id INNER JOIN subjects ON subjects.subjects_id = subject_teacher.subject_id WHERE subject_teacher.teacher_id = ?';
    }
    //pedimos todos los profesore y las asignaturas que imparten
    else{
        sql = 'SELECT DISTINCT first_name, last_name, title FROM teachers INNER JOIN subject_teacher ON teachers.teacher_id = subject_teacher.teacher_id INNER JOIN subjects ON subjects.subjects_id = subject_teacher.subject_id ORDER BY first_name, last_name';
    }
  
    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
       console.log(error); 
    }

}

module.exports = {getAlumnos, postAlumnos, putAlumnos, deleteAlumnos, getMedia, getApuntadas, getImpartidas};
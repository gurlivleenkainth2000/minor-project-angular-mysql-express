const mysqlConfig = {
    user: 'developer',
    password: 'developer',
    host: 'localhost',
    databaseName: 'students'
};

const tables = {
    studentInfo: "student_info",
    users: "users",
    courseCode: "course_code",
    branchCode: "branch_code"
}

module.exports = { mysqlConfig, tables };
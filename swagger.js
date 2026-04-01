const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GabbyTech Academy API',
    description: 'School Management API for Students and Courses'
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:4000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  definitions: {
    Student: {
      firstName: 'Tony',
      lastName: 'Gabito',
      regNumber: 'STU-001',
      grade: 'JSS1',
      gender: 'Male',
      dateOfBirth: '2010-05-14',
      email: 'tony.gabito@gabbytech.com',
      stateOfOrigin: 'Lagos',
      status: 'Active'
    },
    Course: {
      courseCode: 'MTH101',
      courseName: 'Mathematics',
      department: 'Sciences',
      gradeLevel: 'JSS1',
      teacherName: 'Mr. Adeyemi',
      description: 'Basic mathematics for junior secondary students',
      daysPerWeek: 3,
      isActive: true
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
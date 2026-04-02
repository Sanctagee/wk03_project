const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GabbyTech Academy API',
    description: 'School Management API for Students and Courses — with Google OAuth authentication for write operations.',
    version: '2.0.0',
    "contact": {
      "name": "GabbyTech",
      "email": "gabbytech@gmail.com"
    }
  },
  
  host: process.env.NODE_ENV === 'production'
    ? 'school-management-apis-pm5k.onrender.com'
    : 'localhost:4000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  securityDefinitions: {
    OAuth2: {
      type: 'oauth2',
      authorizationUrl: '/auth/google',
      flow: 'implicit',
      scopes: {
        profile: 'Your Google profile',
        email: 'Your Google email'
      }
    }
  },
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
'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//Track API graphQL POC - implemented as AWS Lambda Function
//

// Import graphql library

var graphql = require('graphql');

// Initialise variables for data processing

var new_array = [];
var indicator = 0;

// Dummy data for API responses 

var example1 = {
  consignmentKey: '222222 VLC 20160322000000',
  consignmentNumber: '2000',
  originDepotName: 'VALENCIA',
  originDepotCode: 'VALENCIA',
  customerReference: 'EERSTE',
  collectionDate: '26 Mar 2016',
  deliveryTown: 'Tokyo',
  pieceQuantity: 1,
  deliveryDueDate: '19 Apr 2016',
  signatory: 'x',
  destinationCountry: 'Japan',
  originCountry: 'France',
  statusData: [{
    statusCode: 'D02',
    statusDescription: 'CONSIGNMENT LONG FORM ENTRY',
    groupCode: '',
    severity: '',
    localEventDate: '28 Jun 2010',
    localEventTime: '19:53:00',
    depot: 'FRANKFURT'
  }, {
    statusCode: 'OS',
    statusDescription: 'Origin Shipped',
    groupCode: '',
    severity: 'INFO',
    localEventDate: '29 Jun 2010',
    localEventTime: '00:32:00',
    depot: 'FRANKFURT'
  }]
};

var example2 = {
  consignmentKey: '222222 VLC 20167352600000',
  consignmentNumber: '2001',
  originDepotName: 'OSLO',
  originDepotCode: 'OSLO',
  customerReference: 'PIERRE',
  collectionDate: '26 Apr 2016',
  deliveryTown: 'London',
  pieceQuantity: 1,
  deliveryDueDate: '19 Apr 2016',
  signatory: 'x',
  destinationCountry: 'UK',
  originCountry: 'Italy',
  statusData: [{
    statusCode: 'D02',
    statusDescription: 'CONSIGNMENT LONG FORM ENTRY',
    groupCode: '',
    severity: '',
    localEventDate: '28 Jun 2010',
    localEventTime: '19:53:00',
    depot: 'FRANKFURT'
  }, {
    statusCode: 'OS',
    statusDescription: 'Origin Shipped',
    groupCode: '',
    severity: 'INFO',
    localEventDate: '29 Jun 2010',
    localEventTime: '00:32:00',
    depot: 'FRANKFURT'
  }]
};

var example3 = {
  consignmentKey: '222222 VLC 20220322037800',
  consignmentNumber: '4000',
  originDepotName: 'VALENCIA',
  originDepotCode: 'VALENCIA',
  customerReference: 'RABBIT',
  collectionDate: '26 Mar 2016',
  deliveryTown: 'Edinburgh',
  pieceQuantity: 1,
  deliveryDueDate: '19 Apr 2016',
  signatory: 'x',
  destinationCountry: 'UK',
  originCountry: 'France',
  statusData: [{
    statusCode: 'D02',
    statusDescription: 'CONSIGNMENT LONG FORM ENTRY',
    groupCode: '',
    severity: '',
    localEventDate: '28 Jun 2010',
    localEventTime: '19:53:00',
    depot: 'FRANKFURT'
  }, {
    statusCode: 'OS',
    statusDescription: 'Origin Shipped',
    groupCode: '',
    severity: 'INFO',
    localEventDate: '29 Jun 2010',
    localEventTime: '00:32:00',
    depot: '123'
  }]
};

var example4 = {
  consignmentKey: '222222 VLC 20160322018462',
  consignmentNumber: '4001',
  originDepotName: 'VALENCIA',
  originDepotCode: 'VALENCIA',
  customerReference: 'HAT',
  collectionDate: '26 Mar 2016',
  deliveryTown: 'New York',
  pieceQuantity: 1,
  deliveryDueDate: '19 Apr 2016',
  signatory: 'x',
  destinationCountry: 'USA',
  originCountry: 'Iran',
  statusData: [{
    statusCode: 'D02',
    statusDescription: 'CONSIGNMENT LONG FORM ENTRY',
    groupCode: '',
    severity: '',
    localEventDate: '28 Jun 2010',
    localEventTime: '19:53:00',
    depot: 'FRANKFURT'
  }, {
    statusCode: 'OS',
    statusDescription: 'Origin Shipped',
    groupCode: '',
    severity: 'INFO',
    localEventDate: '29 Jun 2010',
    localEventTime: '00:32:00',
    depot: '123'
  }]
};

var consignmentData = {
  '2000': example1,
  '2001': example2
};

var referenceData = {
  'RABBIT': example3,
  'HAT': example4
};

// graphQL Schema definition

var statusData = new graphql.GraphQLObjectType({
  name: 'StatusData',
  description: 'A TNT consignment status data entry.',
  fields: function fields() {
    return {
      statusCode: {
        type: graphql.GraphQLString,
        description: ''
      },
      statusDescription: {
        type: graphql.GraphQLString,
        description: ''
      },
      groupCode: {
        type: graphql.GraphQLString,
        description: ''
      },
      severity: {
        type: graphql.GraphQLString,
        description: ''
      },
      localEventDate: {
        type: graphql.GraphQLString,
        description: ''
      },
      localEventTime: {
        type: graphql.GraphQLString,
        description: ''
      },
      depot: {
        type: graphql.GraphQLString,
        description: ''
      }
    };
  }
});

var conType = new graphql.GraphQLObjectType({
  name: 'Consignment',
  description: 'A TNT consignment.',
  fields: function fields() {
    return {
      consignmentKey: {
        type: graphql.GraphQLString,
        description: ''
      },
      consignmentNumber: {
        type: graphql.GraphQLString,
        description: ''
      },
      originDepotName: {
        type: graphql.GraphQLString,
        description: ''
      },
      originDepotCode: {
        type: graphql.GraphQLString,
        description: ''
      },
      customerReference: {
        type: graphql.GraphQLString,
        description: ''
      },
      collectionDate: {
        type: graphql.GraphQLString,
        description: ''
      },
      deliveryTown: {
        type: graphql.GraphQLString,
        description: ''
      },
      pieceQuantity: {
        type: graphql.GraphQLInt,
        description: ''
      },
      deliveryDueDate: {
        type: graphql.GraphQLString,
        description: ''
      },
      signatory: {
        type: graphql.GraphQLString,
        description: ''
      },
      destinationCountry: {
        type: graphql.GraphQLString,
        description: ''
      },
      originCountry: {
        type: graphql.GraphQLString,
        description: ''
      },
      statusData: {
        type: new graphql.GraphQLList(statusData),
        description: ''
      }
    };
  }
});

var consignmentType = new graphql.GraphQLList(conType);

var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  description: 'Description for query',
  fields: function fields() {
    return {
      consignment: {
        type: consignmentType,
        args: {
          id: {
            description: 'String of comma separated consignment ID(s) or referece number(s)',
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
          },
          flag: {
            description: 'Flag to indicate if con id (1) or ref id (2)',
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
          }
        },
        resolve: function resolve(root, _ref) {
          var id = _ref.id;
          var flag = _ref.flag;
          return getConsignment(id, flag);
        }
      }
    };
  }
});

var ConsignmentSchema = exports.ConsignmentSchema = new graphql.GraphQLSchema({
  query: queryType,
  types: [consignmentType]
});

// API logic to get required data

function getCo(element) {
  console.log(consignmentData[element]);

  if (indicator === "1") {
    new_array.push(consignmentData[element]);
  } else {
    new_array.push(referenceData[element]);
  }
  console.log(new_array);

  return new_array;
};

function getCon(id) {
  var ida = id.split(',');
  console.log('Getting Consignment Data');
  ida.forEach(getCo);
  return new_array;
};

function getConsignment(id, flag) {
  new_array = [];
  indicator = flag;
  return getCon(id);
};

// Lambda function handler
/**
exports.handler = function (event, context, callback) {
  console.log('Incoming Event', event);
  // In the introspection query from GraphiQL the variables key is not present in the event body
  var variables = event.variables && !isEmpty(event.variables) ? JSON.parse(event.variables) : {};
  graphql.graphql(ConsignmentSchema, event.query, null, variables).then(function (data) {
    return callback(null, data);
  }).catch(function (err) {
    return callback(err);
  });
};
**/

app.use('/graphql', graphqlHTTP({
  schema: ConsignmentSchema,
  graphiql: true
}));

app.listen(4000);
console.log("server up and running");

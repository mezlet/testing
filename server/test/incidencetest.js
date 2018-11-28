/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/* global it,describe:true */
/* eslint no-undef: "error" */

import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../db/db';
import server from '../app';

chai.should();

chai.use(chaiHttp);


/* describe('incidents', () => {
  it('should list ALL incidents on /incidents GET', (done) => {
    chai.request(server)
      .get('/api/v1/incidents')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
}); */

describe('Incidents', () => {
  it('should return a list of all incident', (done) => {
    chai.request(server)
      .get('/api/v1/incidents')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('createdOn');
        res.body.data[0].should.have.property('createdBy');
        res.body.data[0].should.have.property('type');
        res.body.data[0].should.have.property('location');
        res.body.data[0].should.have.property('status');
        res.body.data[0].should.have.property('comment');
        res.body.data[0].id.should.be.a('number');
        res.body.data[0].createdOn.should.be.a('string');

        done();
      });
  });
  it('should return all incidents of type redflag', (done) => {
    chai.request(server)
      .get('/api/v1/incidents/redflags')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].type.should.equal('red-flag');

        done();
      });
  });
  it('should POST incident', (done) => {
    const incident = {
      createdOn: '2018-10-20T17:09:00.953Z',
      createdBy: 2, // represents the user who created this record
      type: 'red-flag', // [red-flag, intervention]
      location: '10.87 12.48', // Lat Long coordinates
      status: 'resolved', // [draft, under investigation, resolved, rejected]
      comment: 'i am here',
    };
    chai.request(server)
      .post('/api/v1/incidents/create')
      .send(incident)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return a specific id', (done) => {
    const newdb = JSON.parse(JSON.stringify(db));
    newdb.save((err, redflag) => {
      chai.request(server)
        .get(`/api/incidents/${redflag.id}`)
        .send(redflag)
        .end((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(redflag.id);
          done();
        });
    });
  });
});

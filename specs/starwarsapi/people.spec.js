// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Star Wars API - People', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should return a list of people', (done) => {
        request.execute(baseUrl)
            .get('/people')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('should return details of a specific person by ID', (done) => {
        const personId = 1; // Luke Skywalker
        request.execute(baseUrl)
            .get(`/people/${personId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties).to.have.property('name').that.is.a('string');
                done();
            });
    });

    it('should return a 404 for a non-existent person ID', (done) => {
        const invalidId = 9999;
        request.execute(baseUrl)
            .get(`/people/${invalidId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').that.is.a('string');
                done();
            });
    });

    it('should include pagination information in the people list', (done) => {
        request.execute(baseUrl)
            .get('/people')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('next').that.is.a('string');
                expect(res.body).to.have.property('previous').that.is.null;
                done();
            });
    });

    it('should return the correct schema for a person', (done) => {
        const personId = 1; // Luke Skywalker
        request.execute(baseUrl)
            .get(`/people/${personId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                const properties = res.body.result.properties;
                expect(properties).to.have.property('name').that.is.a('string');
                expect(properties).to.have.property('height').that.is.a('string');
                expect(properties).to.have.property('mass').that.is.a('string');
                expect(properties).to.have.property('gender').that.is.a('string');
                expect(properties).to.have.property('birth_year').that.is.a('string');
                done();
            });
    });
});
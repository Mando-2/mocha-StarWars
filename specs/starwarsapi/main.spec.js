// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Star Wars API - sanity test', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should return the base API information', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.oneOf(['Welcome to the Star Wars API!', 'ok']);
                expect(res.body).to.have.property('result');
                done();
            });
    });

    it('should verify the people endpoint exists in the API response', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.people).to.exist; // Check if people endpoint exists
                done();
            });
    });

    it('should verify the starships endpoint exists in the API response', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.starships).to.exist; // Check if starships endpoint exists
                done();
            });
    });

    it('should verify the planets endpoint exists in the API response', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.planets).to.exist; // Check if planets endpoint exists
                done();
            });
    });

    it('should verify the films endpoint exists in the API response', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.films).to.exist; // Check if films endpoint exists
                done();
            });
    });

    it('should verify the species endpoint exists in the API response', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.species).to.exist; // Check if species endpoint exists
                done();
            });
    });

    it('should verify the vehicles endpoint exists in the API response', (done) => {
        request.execute(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.vehicles).to.exist; // Check if vehicles endpoint exists
                done();
            });
    });

    it('should return a valid response for a specific film', (done) => {
        request.execute(baseUrl)
            .get('/films/1') // A New Hope
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties.title).to.equal('A New Hope');
                done();
            });
    });

    it('should return a valid response for a specific vehicle', (done) => {
        request.execute(baseUrl)
            .get('/vehicles/4') // Sand Crawler
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties.name).to.equal('Sand Crawler');
                done();
            });
    });

    it('should return a valid response for a specific species', (done) => {
        request.execute(baseUrl)
            .get('/species/1') // Human
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties.name).to.equal('Human');
                done();
            });
    });

    it('should return a valid response for a specific person', (done) => {
        request.execute(baseUrl)
            .get('/people/1') // Luke Skywalker
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties.name).to.equal('Luke Skywalker');
                done();
            });
    });

    it('should return a valid response for a specific planet', (done) => {
        request.execute(baseUrl)
            .get('/planets/1') // Tatooine
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties.name).to.equal('Tatooine');
                done();
            });
    });

    it('should return a valid response for a specific starship', (done) => {
        request.execute(baseUrl)
            .get('/starships/9') // Death Star
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties.name).to.equal('Death Star');
                done();
            });
    });
});
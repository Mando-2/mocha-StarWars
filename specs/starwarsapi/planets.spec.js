// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Star Wars API - Planets', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should return a list of planets', (done) => {
        request.execute(baseUrl)
            .get('/planets')
            .end((err, res) => {
                //console.log(res.body); // Log the response body for debugging
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('should return details of a specific planet by ID', (done) => {
        const planetId = 1; // Example ID
        request.execute(baseUrl)
            .get(`/planets/${planetId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result.properties).to.have.property('name');
                expect(res.body.result.properties).to.have.property('climate');
                done();
            });
    });

    it('should return a 404 for a non-existent planet ID', (done) => {
        const invalidPlanetId = 9999; // Non-existent ID
        request.execute(baseUrl)
            .get(`/planets/${invalidPlanetId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.equal('Not Found');
                done();
            });
    });

    it('should validate the structure of a planet object', (done) => {
        const planetId = 1; // Example ID
        request.execute(baseUrl)
            .get(`/planets/${planetId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.result.properties).to.include.all.keys(
                    'name',
                    'rotation_period',
                    'orbital_period',
                    'diameter',
                    'climate',
                    'gravity',
                    'terrain',
                    'surface_water',
                    'population'
                );
                done();
            });
    });
});
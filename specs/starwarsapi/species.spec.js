// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Star Wars API - Species', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should return a list of species', (done) => {
        request.execute(baseUrl)
            .get('/species')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('should return details of a specific species by ID', (done) => {
        const speciesId = 1; // Example ID
        request.execute(baseUrl)
            .get(`/species/${speciesId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties).to.have.property('name');
                done();
            });
    });

    it('should return a 404 for an invalid species ID', (done) => {
        const invalidSpeciesId = 9999; // Non-existent ID
        request.execute(baseUrl)
            .get(`/species/${invalidSpeciesId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it('should verify the structure of a species object', (done) => {
        const speciesId = 1; // Example ID
        request.execute(baseUrl)
            .get(`/species/${speciesId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.result.properties).to.include.all.keys(
                    'name',
                    'classification',
                    'designation',
                    'average_height',
                    'skin_colors',
                    'hair_colors',
                    'eye_colors',
                    'average_lifespan',
                    'homeworld',
                    'language'
                );
                done();
            });
    });
});
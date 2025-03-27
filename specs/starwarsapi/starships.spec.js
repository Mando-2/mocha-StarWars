// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Starships - Starships', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should return a list of starships', (done) => {
        request.execute(baseUrl)
            .get('/starships')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('should return details of a specific starship by ID', (done) => {
        const starshipId = 9; // Example ID
        request.execute(baseUrl)
            .get(`/starships/${starshipId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties).to.have.property('name');
                done();
            });
    });

    it('should return 404 for a non-existent starship ID', (done) => {
        const invalidId = 99999;
        request.execute(baseUrl)
            .get(`/starships/${invalidId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should validate the schema of a starship object', (done) => {
        const starshipId = 9; // Example ID
        request.execute(baseUrl)
            .get(`/starships/${starshipId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                const properties = res.body.result.properties;
                expect(properties).to.have.property('name').that.is.a('string');
                expect(properties).to.have.property('model').that.is.a('string');
                expect(properties).to.have.property('manufacturer').that.is.a('string');
                expect(properties).to.have.property('cost_in_credits').that.is.a('string');
                expect(properties).to.have.property('crew').that.is.a('string');
                done();
            });
    });
});
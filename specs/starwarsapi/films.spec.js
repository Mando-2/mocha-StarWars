// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Star Wars API - Films', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should fetch all films successfully', (done) => {
        request.execute(baseUrl)
            .get('/films')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.be.an('array');
                done();
            });
    });

    it('should fetch a specific film by ID', (done) => {
        const filmId = 1; // Example film ID
        request.execute(baseUrl)
            .get(`/films/${filmId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties).to.have.property('title');
                done();
            });
    });

    it('should validate the structure of films', (done) => {
        request.execute(baseUrl)
            .get('/films')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.be.an('array');
                res.body.result.forEach((film) => {
                    expect(film).to.have.property('uid').that.is.a('string');
                    expect(film).to.have.property('properties').that.is.an('object');
                    expect(film.properties).to.have.property('title').that.is.a('string');
                    expect(film.properties).to.have.property('episode_id').that.is.a('number');
                    expect(film.properties).to.have.property('opening_crawl').that.is.a('string');
                    expect(film.properties).to.have.property('director').that.is.a('string');
                    expect(film.properties).to.have.property('producer').that.is.a('string');
                    expect(film.properties).to.have.property('release_date').that.is.a('string');
                    expect(film.properties).to.have.property('characters').that.is.an('array');
                    expect(film.properties).to.have.property('planets').that.is.an('array');
                    expect(film.properties).to.have.property('starships').that.is.an('array');
                    expect(film.properties).to.have.property('vehicles').that.is.an('array');
                    expect(film.properties).to.have.property('species').that.is.an('array');
                });
                done();
            });
    });
});
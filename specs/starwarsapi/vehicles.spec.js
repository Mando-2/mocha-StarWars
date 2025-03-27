// Import necessary modules
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

// Use chaiHttp for HTTP requests
chai.use(chaiHttp);

describe('Star Wars API - Vehicles', () => {
    const baseUrl = 'https://www.swapi.tech/api';

    it('should fetch a list of vehicles', (done) => {
        request.execute(baseUrl)
            .get('/vehicles')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('should fetch a specific vehicle by ID', (done) => {
        const vehicleId = 4; // Example ID
        request.execute(baseUrl)
            .get(`/vehicles/${vehicleId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.result).to.have.property('properties');
                expect(res.body.result.properties).to.have.property('name');
                done();
            });
    });

    it('should return 404 for a non-existent vehicle ID', (done) => {
        const invalidVehicleId = 9999; // Non-existent ID
        request.execute(baseUrl)
            .get(`/vehicles/${invalidVehicleId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should validate the structure of a vehicle object', (done) => {
        const vehicleId = 4; // Example ID
        request.execute(baseUrl)
            .get(`/vehicles/${vehicleId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.result.properties).to.include.all.keys(
                    'name',
                    'model',
                    'manufacturer',
                    'cost_in_credits',
                    'length',
                    'max_atmosphering_speed',
                    'crew',
                    'passengers',
                    'cargo_capacity',
                    'consumables',
                    'vehicle_class'
                );
                done();
            });
    });
});
describe("Category Scenario", () => {

  let categoryId;

    it("GET All Categories", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/",
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('name');
            expect(response.body[0]).to.have.property('slug');
        });
    });

    it("GET Category by ID", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/1",
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('slug');
        });
    });

    it("GET Invalid Category", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/99999",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
        });
    });

    it("POST Create New Category", () => {
        cy.request({
            method: "POST",
            url: "https://api.escuelajs.co/api/v1/categories/",
            body: {
                name: "New Category 123",
                image: "https://placehold.co/600x400"
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq('New Category 123');
            expect(response.body).to.have.property('slug');
            expect(response.body).to.have.property('image');
            categoryId = response.body.id;
        });
    });

    it("POST Invalid Category", () => {
        cy.request({
            method: "POST",
            url: "https://api.escuelajs.co/api/v1/categories/",
            failOnStatusCode: false,
            body: {
                image: "https://placehold.co/600x400"
            }
        }).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.have.property("message");
        });
    });

    it("PUT Update Category", () => {
        cy.request({
            method: "PUT",
            url: "https://api.escuelajs.co/api/v1/categories/2",
            body: {
              name: "Update Name Category",
              image: "https://placehold.co/600x400"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq("Update Name Category");
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("slug");
        });
    });

    it("PUT Invalid Category ID", () => {
        cy.request({
            method: "PUT",
            url: "https://api.escuelajs.co/api/v1/categories/99999",
            failOnStatusCode: false,
            body: {
                name: "Updated Invalid Category",
                image: "https://placehold.co/600x400"
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property("message");
        });
    });

    it("DELETE Category", () => {
        cy.request({
            method: "DELETE",
            url: `https://api.escuelajs.co/api/v1/categories/${categoryId}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq("true");
        });
    });

    it("GET Category After Delete", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/${categoryId}",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it("GET Category By Slug", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/slug/shoes"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.slug).to.eq("shoes");
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("name");
        });
    });

    it("GET Categories With Limit", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/?limit=5"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.at.most(5);
        });
    });

    it("GET Categories With Offset", () => {
        cy.request({
            method: "GET",
            url: "https://api.escuelajs.co/api/v1/categories/?offset=5&limit=5"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.at.most(5);
        });
    });

});
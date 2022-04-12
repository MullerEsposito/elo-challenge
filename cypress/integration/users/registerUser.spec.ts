describe("Register User",() => {
  it("tests whether all fields are on screen.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").should("exist");
    cy.get("[name=password]").should("exist");
    cy.get("[name=password-confirmation]").should("exist");
    cy.contains("Salvar").should("exist");
  });

  it("should be required all fields.", () => {
    cy.visit("http://localhost:3000/users/register");

    const saveButton = cy.contains("Salvar").click();
    
    cy.get("input:invalid").should("have.length", 3);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=user]").type("New User");
    saveButton.click();

    cy.get("input:invalid").should("have.length", 2);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password]").type("A1@45678");
    saveButton.click();

    cy.get("input:invalid").should("have.length", 1);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password-confirmation]").type("A1@45678");
    saveButton.click();

    cy.get("input:invalid").should("have.length", 0);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.true");
  });

  it("should be validate the password input field.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").type("New User");
    cy.get("[name=password]").type("A");
    const saveButton = cy.contains("Salvar").click();   
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password]").type("A1");
    saveButton.click();   
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password]").type("A1@");
    saveButton.click();   
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password]").type("A1@345678");
    saveButton.click();   
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.true");
  });

  it("should be validate the password confirmation input field.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").type("New User");
    cy.get("[name=password]").type("A1@45678");
    cy.get("[name=password-confirmation]").type("diferentPassword");
    const saveButton = cy.contains("Salvar").click();   
    
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password-confirmation]").clear();
    cy.get("[name=password-confirmation]").type("A1@45678");
    saveButton.click();   
    
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.true");
  })
})
describe("Register User",() => {
  const userName = "New User";
  const validPassword = "A1@45678";

  it("tests whether all fields are on screen.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").should("exist");
    cy.get("[name=password]").should("exist");
    cy.get("[name=password-confirmation]").should("exist");
    cy.contains("Salvar").should("exist");
  });

  it.only("should be required all fields.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").type(" ");
    cy.get("[name=user]").clear();

    cy.contains("Salvar").click();
    
    cy.get("input:invalid").should("have.length", 3);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=user]").type(userName);
    cy.get("[name=password]").type(" ");
    cy.get("[name=password]").clear();
    cy.contains("Salvar").click();

    cy.get("input:invalid").should("have.length", 2);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=password]").type(validPassword);
    cy.get("[name=password-confirmation]").type(" ");
    cy.get("[name=password-confirmation]").clear();
    cy.contains("Salvar").click();

    cy.get("input:invalid").should("have.length", 1);
    cy.get<HTMLObjectElement>("[name=user]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");
  });

  it("shouldn't been able to type a password without at least 1 numeric digit.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").type(userName);
    cy.get("[name=password]").type("Ab@cdefgh");
    cy.contains("Salvar").click();   
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get("[name=password]").clear();
  });

  it("shouldn't been able to type a password without at least 1 capitalite letter.", () => {
    cy.get("[name=password]").type("a1@cdefgh");
    cy.contains("Salvar").click();    
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get("[name=password]").clear();
  });

  it("shouldn't been able to type a password without at least 1 special character.", () => {
    cy.get("[name=password]").type("a1bcdefgh");
    cy.contains("Salvar").click();    
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get("[name=password]").clear();
  });

  it("shouldn't been able to type a password without at least 8 digits.", () => {
    cy.get("[name=password]").type("@B3defg");
    cy.contains("Salvar").click();    
    
    cy.get<HTMLObjectElement>("[name=password]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get("[name=password]").clear();
  });

  it("shouldn't been able to type different passwords.", () => {
    cy.get("[name=password]").type(validPassword);
    cy.get("[name=password-confirmation]").type("diferentPassword");
    cy.contains("Salvar").click();   
    
    cy.get<HTMLObjectElement>("[name=password-confirmation]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get("[name=password-confirmation]").clear();
  });

  it("should be possible register an user.", () => {
    cy.visit("http://localhost:3000/users/register");

    cy.get("[name=user]").type(userName);
    cy.get("[name=password]").type(validPassword);
    cy.get("[name=password-confirmation]").type(validPassword);
    cy.contains("Salvar").click();

    cy.contains("sucesso").should("exist");
  });

  it("should not been possible register an user with the same user name.", () => {
    cy.visit("http://localhost:3000/users/register");
    
    cy.get("[name=user]").type(userName);
    cy.get("[name=password]").type(validPassword);
    cy.get("[name=password-confirmation]").type(validPassword);
    cy.contains("Salvar").click();

    cy.get("[name=user]").type(userName);
    cy.get("[name=password]").type(validPassword);
    cy.get("[name=password-confirmation]").type(validPassword);
    cy.contains("Salvar").click();

    cy.contains("Usuário já existe").should("exist");
  });
})
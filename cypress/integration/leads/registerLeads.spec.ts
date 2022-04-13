describe("Register Leads", () => {
  it("tests whether all fields are on screen.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").should("exist");
    cy.get("[name=phone]").should("exist");
    cy.get("[name=email]").should("exist");
    cy.get("[id=checkbox-group]").should("exist");
    cy.contains("Salvar").should("exist");
    cy.get("[id=button-back]").should("exist");
  });

  it("should be required all fields.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type(" ");
    cy.get("[name=name]").clear();
    cy.contains("Salvar").click();
    
    cy.get("input:invalid").should("have.length", 3);
    cy.get<HTMLObjectElement>("[name=name]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=phone]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=email]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type(" ");
    cy.get("[name=phone]").clear();
    cy.contains("Salvar").click();

    cy.get("input:invalid").should("have.length", 2);
    cy.get<HTMLObjectElement>("[name=name]").then($el => $el[0].checkValidity()).should("be.true");
    cy.get<HTMLObjectElement>("[name=phone]").then($el => $el[0].checkValidity()).should("be.false");
    cy.get<HTMLObjectElement>("[name=email]").then($el => $el[0].checkValidity()).should("be.false");

    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type(" ");
    cy.get("[name=email]").clear();
    cy.contains("Salvar").click();    
  });

  it("should be possible to check the opportunities individually.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });
    cy.get("[value=RPA]").should("be.checked");
    cy.get("[value=Analytics]").should("be.checked");
    cy.get("[value='Produto Digital']").should("not.be.checked");
    cy.get("[value=BPM]").should("not.be.checked");
  });

  it("should be possible to check all opportunities by clicking in check all input.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[value=check-all]").check({ force: true });
    
    cy.get("[value=RPA]").should("be.checked");
    cy.get("[value=Analytics]").should("be.checked");
    cy.get("[value='Produto Digital']").should("be.checked");
    cy.get("[value=BPM]").should("be.checked");

    cy.get("[value=check-all]").uncheck({ force: true });

    cy.get("[value=RPA]").should("not.be.checked");
    cy.get("[value=Analytics]").should("not.be.checked");
    cy.get("[value='Produto Digital']").should("not.be.checked");
    cy.get("[value=BPM]").should("not.be.checked");
  });

  it("should be showed a confirmation message when lead saved.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });
    
    cy.contains("Salvar").click();

    cy.contains("Lead cadastrado com sucesso!").should("exist");
  });

  it("shouldn't been able to register leads with the same e-mail.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });

    cy.contains("Salvar").click();

    cy.get("[name=name]").type("New Lead 2");
    cy.get("[name=phone]").type("38984171000");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["BPM", "Analytics"], { force: true });
    
    cy.contains("Salvar").click();

    cy.contains("Já existe").should("exist");
  });

  it("should be saved by default as potential lead.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });
    
    cy.contains("Salvar").click();
    cy.visit("http://localhost:3000/leads");

    cy.get("tr").eq(0).get("td").eq(0).should("contain", "New Lead");
  });
})
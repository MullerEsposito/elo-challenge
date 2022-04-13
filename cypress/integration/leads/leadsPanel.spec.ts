describe("Leads Panel", () => {
  it("tests whether all fields are on screen.", () => {
    cy.visit("http://localhost:3000/leads");

    cy.get("button").should("contain", "Novo Lead");
    const table = cy.get("table");

    table.get("tr").eq(0).get("th").eq(0).should("contain", "Cliente em Potencial");
    table.get("tr").eq(0).get("th").eq(1).should("contain", "Dados Confirmados");
    table.get("tr").eq(0).get("th").eq(2).should("contain", "Reunião Agendada");
  });

  it.skip("should be only possible drag a lead to a next column.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });
    
    cy.contains("Salvar").click();
    cy.visit("http://localhost:3000/leads");

    cy.get("[draggable-id=newlead@hotmail.com0]").move({ deltaX: 200, deltaY: 200 });
    

  })
});
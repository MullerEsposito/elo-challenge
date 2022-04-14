import { getDroppableSelector } from "../util";
import * as keyCodes from "../key-codes"

describe("Leads Panel", () => {
  it("tests whether all fields are on screen.", () => {
    cy.visit("http://localhost:3000/leads");

    cy.get("button").should("contain", "Novo Lead");
    const table = cy.get("table");

    table.get("tr").eq(0).get("th").eq(0).should("contain", "Cliente em Potencial");
    table.get("tr").eq(0).get("th").eq(1).should("contain", "Dados Confirmados");
    table.get("tr").eq(0).get("th").eq(2).should("contain", "Reunião Agendada");
  });

  it("should be able to drag a lead just to the column right after it.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });
    
    cy.contains("Salvar").click();
    cy.visit("http://localhost:3000/leads");

    cy.contains("New Lead").as("potential-status").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com0");

    cy.get("@potential-status")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
      .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com2");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com0");

    cy.get("@potential-status")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });
    
    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com0");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");

    cy.contains("New Lead").as("confirmed-data").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");
    cy.get("@confirmed-data")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com2");
  });

  it("shouldn't been able to drag to a column before.", () => {
    cy.visit("http://localhost:3000/leads/register");

    cy.get("[name=name]").type("New Lead");
    cy.get("[name=phone]").type("38984171252");
    cy.get("[name=email]").type("newlead@hotmail.com");
    cy.get("[type=checkbox]").check(["RPA", "Analytics"], { force: true });
    
    cy.contains("Salvar").click();
    cy.visit("http://localhost:3000/leads");

    cy.contains("New Lead").as("potential-status").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com0");

    cy.get("@potential-status")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com0");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");

    cy.contains("New Lead").as("confirmed-data").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");
    cy.get("@confirmed-data")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowLeft, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com0");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");

    cy.get("@confirmed-data")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com2");

    cy.contains("New Lead").as("schelled-meet").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com2");
    cy.get("@schelled-meet")
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      .trigger('keydown', { keyCode: keyCodes.arrowLeft, force: true })
      .wait(1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    cy.contains("New Lead").should("not.have.attr", "data-rbd-draggable-id", "newlead@hotmail.com1");
    cy.contains("New Lead").should("have.attr", "data-rbd-draggable-id", "newlead@hotmail.com2");
  });
});
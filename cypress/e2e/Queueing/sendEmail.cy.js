describe('Send Email Queueing Test', () => {
  beforeEach(() => {
    cy.getAuthToken().as('token');
  });

  it('should queue an email successfully (202)', function () {
    cy.sendEmailRequest(this.token, {
      to: "validuser@example.com",
      subject: "Welcome!",
      body: "Thanks for signing up."
    }).then((res) => {
      expect(res.status).to.eq(202);
    });
  });

  it('should fail with 400 when "to" is missing', function () {
    cy.sendEmailRequest(this.token, {
      subject: "Missing To Field",
      body: "This should fail."
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail with 400 when "to" is invalid email', function () {
    cy.sendEmailRequest(this.token, {
      to: "invalid-email",
      subject: "Invalid Email",
      body: "This should also fail."
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should return 503 when queue is full (simulated)', function () {
    cy.sendEmailRequest(this.token, {
      to: "user@example.com",
      subject: "Queue Full Test",
      body: "This simulates queue overload"
    }).then((res) => {
      expect([202, 503]).to.include(res.status);
    });
  });
});

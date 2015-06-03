describe('Player', function() {
  it("creates a new player", function() {
    var testPlayer = new Player("Jimbo");
    expect(testPlayer.name).to.equal("Jimbo");
    expect(testPlayer.score).to.equal(0);
  });
});

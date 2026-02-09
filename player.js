let player = {
    last_tick: Date.now(),
    points: new Decimal(1),
    //upgrades format
    //name, description, price, currency, bought
    //inspired by tmt upgrade making ()
    database: {
        upgrades: [
            ["Starting out strong", "Double the points.", new Decimal(10), "points", false],
            ["Again, and again", "Boost points based on points", new Decimal(30), "points", false],
            ["Once and for all", "^1.2 points/s.", new Decimal(250), "points", false],
            ["Here we go again!", "Unlocks <b>temperature</b>.", new Decimal(1000), "points", false]
        ]
    }
}
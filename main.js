

function point_gain() {
    g = new Decimal("1")
    if (hasUpgrade(0)) { g = g.times(2) }
    if (hasUpgrade(1)) { g = g.times(player.points.add(10).slog().add(1).pow(2)) }
    if (hasUpgrade(2)) { g = g.pow(1.2) }
    return g
}

function stats_update() {
    dt = new Decimal((Date.now()-player.last_tick)/1000)
    player.last_tick = Date.now()
    player.points = player.points.add(dt.times(point_gain()))
}


function upgrade_buy(i) {
    r = player.database.upgrades
    if (player[r[i][3]].gte(r[i][2])&&!r[i][4]) {
        player[r[i][3]]=player[r[i][3]].sub(r[i][2])
        player.database.upgrades[i][4] = true
        document.getElementById(`u-${i}`).style["background-color"] = "#33aa55"
    }
}

function hasUpgrade(i) {
    return player.database.upgrades[i][4]
}

function init_graphics(tab) {
    if (tab == "Main") {
        document.getElementById("u").innerHTML = ""
        for (i = 0; i < player.database.upgrades.length; i++) {
            cnt = player.database.upgrades[i]
            document.getElementById("u").innerHTML = document.getElementById("u").innerHTML + `<button id="u-${i}" onclick="upgrade_buy(${i})" style="left:${i * 180}px${hasUpgrade(i)?";background-color: #33aa55":""}">${cnt[0]}<hr><span style="font-size: 12px">${cnt[1]}<br>Cost: ${format(cnt[2])} ${cnt[3]}</span></button>`
        }
    }
}

function graphics() {
    document.getElementById("points").innerHTML = format(player.points, 3)
    document.getElementById("pps").innerHTML = format(point_gain(), 3) + "/s"
}

function main_loop() {
    graphics()
    stats_update()
}

init_graphics("Main")
setInterval(main_loop,10)
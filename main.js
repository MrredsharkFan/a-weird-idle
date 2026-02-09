

function point_gain() {
    g = new Decimal("1")
    if (hasUpgrade(0)) { g = g.times(2) }
    if (hasUpgrade(1)) { g = g.times(player.points.add(10).slog().add(1).pow(2)) }
    if (hasUpgrade(2)) { g = g.pow(1.2) }
    if (hasUpgrade(4)) { g = g.times(get_temp(player.heat).sub(27).pow(10)) }
    return g
}

function heat_gain() {
    g = new Decimal("1")
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
        if (i == 3) {
            heat_logic()
        }
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
            //one of the most complicated sections for me, you know im an amatuar, right...?
            //(throws out 7 years of using scratch)
            document.getElementById("u").innerHTML = document.getElementById("u").innerHTML + `<button id="u-${i}" onclick="upgrade_buy(${i})" style="left:${(i%4) * 180}px;top:${Math.floor(i/4)*120}px;${hasUpgrade(i)?";background-color: #33aa55":""}">${cnt[0]}<hr><span style="font-size: 12px">${cnt[1]}<br>Cost: ${format(cnt[2])} ${cnt[3]}</span></button>`
        }
    }
}

function heat_logic() {
    player.heat = player.heat.add(heat_gain())
    player.h.xpos = Math.random()*60+20
    player.h.ypos = Math.random()*40+30 //margin
    document.getElementById("h").innerHTML = hasUpgrade(3) ? heat_style() : `<center style="font-size: 25px">Not unlocked!</center>`
}

function heat_style() {
    c = `<button onclick="heat_logic()" style="position: absolute; left: ${player.h.xpos}%; top: ${player.h.ypos}%">Click me!!!!!</button>`
    return c
}

function get_temp(h) {
    return h.add(1).pow(0.25).slog().pow(3).times(4).add(28)
}

function graphics() {
    document.getElementById("points").innerHTML = format(player.points, 3)
    document.getElementById("pps").innerHTML = format(point_gain(), 3) + "/s"
    document.getElementById("heat").innerHTML = format(player.heat, 3)
    document.getElementById("temp").innerHTML = format(get_temp(player.heat), 3)+"*C"
}

function main_loop() {
    graphics()
    stats_update()
}

heat_logic()
init_graphics("Main")
setInterval(main_loop,10)
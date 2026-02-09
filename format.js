let illions = ["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No"]

function format(d, s = 3) {
    d = new Decimal(d)
    if (d.lte("0")) { return "-" + format(d, s) }
    else if (d.lte("1000")) { return d.toFixed(s) }
    else if (d.lte("1e33")) { return new Decimal(10).pow(d.log10().mod(3)).toFixed(s)+illions[d.log10().div(3).floor()-1] }
    else if (d.lte("1e1000000")) { return d.mantissaWithDecimalPlaces(s).toFixed(s) + "e" + d.log(10).floor() }
    else if (d.lte("10^^6")) { return "e" + format(d.log10(), s) }
    else {return d}
}
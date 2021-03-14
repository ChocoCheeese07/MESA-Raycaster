var Utils = {
    degToRad: function(deg) {
        return deg * Math.PI / 180;
    },
    radToDeg: function(rad) {
        return rad * 180 / Math.PI;
    },
    drawLine: function(ctx, x1, y1, x2, y2, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    },
    roundToNearest: function(target, value) {
        let multiplier = value / target;
        let temp = value - (Math.round(multiplier) * target);
        return value - temp;
    },
    distance: function(x1, y1, x2, y2) {
        var x = (x2 - x1) * (x2 - x1);
        var y = (y2 - y1) * (y2 - y1);
        return Math.sqrt(x + y);
    }
};

export default Utils;
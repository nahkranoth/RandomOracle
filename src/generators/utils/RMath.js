class RMath{
    monteCarlo() {
        while (true) {
            var r1 = Mathf.random();
            var probability = r1;
            var r2 = Mathf.random();
            if (r2 < probability) {
                return r1;
            }
        }
    };
}

module.exports = RMath;

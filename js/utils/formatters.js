const Formatters = {
  price(amount) {
    if (amount == null) return "";
    return "$" + Number(amount).toLocaleString("es-CL");
  },
  discount(price, comparePrice) {
    if (!comparePrice || comparePrice <= price) return null;
    return Math.round((1 - price / comparePrice) * 100);
  },
  truncate(str, n = 80) {
    if (!str) return "";
    return str.length <= n ? str : str.slice(0, n).trim() + "…";
  }
};

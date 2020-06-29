process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || "prod";

let DB_URI;

if (process.env.NODE_ENV === "dev") {
  DB_URI = "mongodb://localhost:27017/coffee";
} else {
  DB_URI =
    "mongodb+srv://juandiego:HmYtpc3P4jrFNlLa@cluster0.hx555.mongodb.net/coffee";
}

process.env.DB_URI = DB_URI;

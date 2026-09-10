# Collaborative Project Management App

Next.js aplikacija za kreiranje, upravljanje i suradnju na projektima.

## Preduvjeti za pokretanje

- [Docker](https://docs.docker.com/get-started/get-docker/)
- [Pokrenuta API instanca](https://github.com/Filip-A25/collaborative-project-management-backend)

## Konfiguracija

| Varijable okruženja | Opis                                                             | Primjer                        |
| ------------------- | ---------------------------------------------------------------- | ------------------------------ |
| `JWT_SECRET`        | Niz znakova za potpisivanje tokena (isti koji se koristi za API) | `strong-generated-string`      |
| `API_URL`           | URL za .NET API (host, port i `/api/v1` nastavak)                | `http://localhost:5215/api/v1` |

## Pokretanje aplikacije

Koraci za pokretanje:

```bash
# Klonirajte repozitorij
git clone https://github.com/Filip-A25/collaborative-project-management-frontend.git
```

Prije pokretanja klijentskog sloja, pokrenite [.NET API](https://github.com/Filip-A25/collaborative-project-management-backend).
Stvorite `.env` datoteku s varijablama okruženja na temelju `.env.example`.

```bash
# Unutar root direktorija kreirajte Docker sliku
docker build -t collab-pm-app .
```

Zatim pokrenite kontejner:

```bash
# Unutar root direktorija kreirajte Docker sliku
docker run --name collab-pm-app -p 3000:3000 collab-pm-app
```

`-p 3000:3000` označava mapiranje portova, gdje je prva vrijednost port računala, a druga vrijednost port unutar kontejnera.

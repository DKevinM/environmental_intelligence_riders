# Saskatchewan Roughriders Environmental Intelligence

Environmental sit-rep for Mosaic Stadium, Regina — forked from the Calgary/Edmonton
Folk Fest sit-reps, same shape (live weather, AQHI, hazard assessment, narrative,
standalone HTML dashboard), rewired for Saskatchewan's data pipeline (`SK_datapull`)
instead of Alberta's.

## What's different from the Alberta version

- **AQHI current/forecast/blend** all read `SK_datapull`'s files instead of
  `AB_datapull`'s — different schema, handled in `modules/air_quality/service.py`.
- **Forecast** is Saskatchewan's real shape: a 4-period day/night outlook (Today /
  Tonight / Tomorrow / Tomorrow Night) scraped from ECCC's provincial summary page,
  not a fixed numeric "+3h" model output like Alberta's. The report labels it
  correctly (e.g. "AQHI forecast for Today") rather than mislabeling it as +3h.
- **No back-trajectory wind model** — `AB_winds`' HRDPS-based source-attribution
  model is Alberta-specific infrastructure; there's no Saskatchewan equivalent yet.
  Deliberately left out of this first pass rather than faked.
- **No traffic camera integration** — no confirmed Saskatchewan equivalent to
  511 Alberta's camera API researched yet.
- Weather (Open-Meteo), fire (NASA FIRMS), and Environment Canada weather alerts
  (MSC GeoMet) are all provider-agnostic and needed no changes.

## Install and run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export FIRMS_API_KEY=...   # see /opt/airquality/config/intelligence.env on the server
python run_demo.py
xdg-open output/dashboard.html
```

## Test

```bash
python -m unittest discover -s tests -v
```

## Outputs

- `output/dashboard.html`
- `output/dashboard_data.json`
- `output/intelligence_summary.json`
- `output/run.log`

## Known next steps (not yet built)

- Wind shear detection (divergent wind direction with height) as its own hazard
- Temperature inversion / low-ceiling detection
- UV Index
- AQHI rate-of-change as its own hazard, not just a raw field
- WBGT (Wet Bulb Globe Temperature) instead of/alongside humidex for heat, given
  the sports-specific audience
- Real-time lightning proximity, if an accessible feed exists
- Extending `AB_winds`' HRDPS pull to a Saskatchewan-region bounding box, since the
  continental HRDPS domain it already downloads likely covers this area

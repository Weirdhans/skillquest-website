#!/usr/bin/env python3
"""Generate the QR codes on the download page (public/qr/*.svg).

Desktop visitors cannot install from their computer, so the download page
shows a QR code per platform. Rerun after changing a target URL:

    pip install segno
    python scripts/generate-qr-codes.py
"""

from pathlib import Path

import segno

OUT = Path(__file__).resolve().parent.parent / "public" / "qr"
LOCALES = ["nl", "en", "de", "fr", "es", "it"]

# App Store link with its own campaign token, so QR installs show up
# separately in App Store Connect > Analytics > Campaigns.
IOS_URL = "https://apps.apple.com/app/apple-store/id6755604671?pt=128291575&ct=website-qr&mt=8"

# The Android test needs the Google Group joined from the phone's own Google
# account, so the QR code opens the same steps on the phone.
ANDROID_URL = "https://skill-quest.app/{locale}/download?platform=android&utm_source=website&utm_medium=qr#android-early-access"


def save(url: str, name: str) -> None:
    qr = segno.make(url, error="m")
    qr.save(OUT / name, scale=6, border=2, dark="#0f172a", light="#ffffff", xmldecl=False)
    print(f"{name}: version {qr.version}")


OUT.mkdir(parents=True, exist_ok=True)
save(IOS_URL, "ios.svg")
for locale in LOCALES:
    save(ANDROID_URL.format(locale=locale), f"android-{locale}.svg")

import os

def test_site():
    print("=== Testing The Gaming Arena Website Files ===")
    
    # 1. Check files existence
    expected_files = ['index.html', 'styles.css', 'config.js', 'app.js', 'favicon.svg']
    for f in expected_files:
        assert os.path.exists(f), f"File missing: {f}"
        print(f"[OK] Found {f} ({os.path.getsize(f)} bytes)")

    # 2. Check HTML content
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Verify sections
    sections = [
        ('hero', '1. Hero Section'),
        ('options', '2. Gaming Options'),
        ('prices', '3. Price Section'),
        ('why-us', '4. Why Play At The Gaming Arena'),
        ('games', '5. Games Section'),
        ('tournaments', '6. Tournament Section'),
        ('gallery', '7. Gallery Section'),
        ('location', '8. Location / Map Section'),
        ('contact', '9. Contact Section'),
        ('hours', '10. Opening Hours Section')
    ]

    for sec_id, name in sections:
        assert f'id="{sec_id}"' in html, f"Missing section: {name} (id='{sec_id}')"
        print(f"[OK] Verified section: {name}")

    # Verify key requirements
    checks = [
        ('THE GAMING ARENA', "Brand name"),
        ('Play. Compete. Enjoy.', "Brand tagline"),
        ('Your local gaming destination for PlayStation, Tekken and competitive gaming.', "Subtitle"),
        ('View Prices', "Hero Button 1"),
        ('Find Us', "Hero Button 2"),
        ('PS5', "PS5 gaming option"),
        ('PS4', "PS4 gaming option"),
        ('Tekken', "Tekken arcade option"),
        ('₹50', "PS5/PS4 Rs50/hr rate"),
        ('6 Coins', "Tekken Rs10 -> 6 Coins"),
        ('12 Coins', "Tekken Rs20 -> 12 Coins"),
        ('30 Coins', "Tekken Rs50 -> 30 Coins"),
        ('60 Coins', "Tekken Rs100 -> 60 Coins"),
        ('Ask at the counter for current offers and tournament pricing.', "Pricing note"),
        ('WHAT CAN YOU PLAY?', "Games section title"),
        ('Games available may vary', "Games disclaimer label"),
        ('READY TO COMPETE?', "Tournament section title"),
        ('Join Tournament', "Tournament button"),
        ('[ENTER GAMING ARENA ADDRESS HERE]', "Address placeholder"),
        ('[PHONE NUMBER]', "Phone number placeholder"),
        ('[WHATSAPP NUMBER]', "WhatsApp placeholder"),
        ('[INSTAGRAM]', "Instagram placeholder"),
        ('11:00 AM – 10:00 PM', "Opening hours"),
        ('Monday – Sunday', "Opening days"),
        ('© 2026 The Gaming Arena. All Rights Reserved.', "Footer copyright")
    ]

    for query, desc in checks:
        assert query in html, f"Requirement missing in HTML: {desc} ('{query}')"
        print(f"[OK] HTML Check passed: {desc}")

    # 3. Check config.js
    with open('config.js', 'r', encoding='utf-8') as f:
        cfg = f.read()

    assert 'ARENA_CONFIG' in cfg
    assert '[ENTER GAMING ARENA ADDRESS HERE]' in cfg
    assert '[PHONE NUMBER]' in cfg
    assert '[WHATSAPP NUMBER]' in cfg
    assert '[INSTAGRAM]' in cfg
    print("[OK] config.js verified with all centralized business fields")

    # 4. Check CSS for responsive breakpoints and 375px friendliness
    with open('styles.css', 'r', encoding='utf-8') as f:
        css = f.read()

    assert '@media (max-width: 480px)' in css, "Missing small mobile media query"
    assert '@media (max-width: 768px)' in css, "Missing mobile media query"
    assert 'overflow-x: hidden' in css, "Missing overflow-x prevention"
    assert '--neon-cyan' in css, "Missing neon cyan styling"
    assert '--neon-purple' in css, "Missing neon purple styling"
    print("[OK] styles.css verified for mobile responsiveness down to 375px and color theme")

    print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")

if __name__ == '__main__':
    test_site()

# APK Distribution Site Templates

This directory contains template files for creating APK distribution sites similar to the w2g (Watch Together) setup.

## 📁 What's Included

- `languages.js.template` - Multi-language translation template
- `add-apk.sh.template` - APK management script template
- `script.js.template` - Dynamic content and download handler template

## 🚀 Quick Start

### 1. Create a New App Directory

```bash
mkdir your-app-name
cd your-app-name
```

### 2. Copy Template Files

```bash
# Copy templates
cp ../apksite-templates/languages.js.template languages.js
cp ../apksite-templates/add-apk.sh.template add-apk.sh
cp ../apksite-templates/script.js.template script.js

# Make the script executable
chmod +x add-apk.sh
```

### 3. Customize Each Template

#### languages.js

1. Open `languages.js` in your editor
2. Find and replace all instances of `YOUR_APP_NAME` with your app name
3. Translate all values for each language you want to support
4. Update the `translations` object with your app's content:
   - `title` - Your app name
   - `tagline` - Short tagline
   - `subtitle` - Even shorter subtitle
   - `feat1Title` through `feat12Title` - Your 12 features
   - `feat1Desc` through `feat12Desc` - Feature descriptions
   - All other keys as needed

5. Keep languages you don't need, or add new ones following the same pattern

**Important:** For RTL languages (like Arabic), add the language code to the `rtlLanguages` array at the bottom.

#### add-apk.sh

1. Open `add-apk.sh` in your editor
2. Update the CONFIGURATION section:
   ```bash
   BASE_URL="https://yourusername.github.io/repo/appdir"
   ```
   Replace with your actual GitHub Pages URL
3. No other changes needed - the script works as-is!

#### script.js

1. Open `script.js` in your editor
2. Update the CONFIG section if needed (defaults work fine):
   ```javascript
   CONFIG_FILE: 'apks.json',  // Your config file name
   ```
3. Find and replace `Your App` and `Your Tagline Here` with your app details

### 4. Create Required Files

You'll also need to create these files (not in templates):

#### apks.json

```json
{
  "default": "yourapp_default.apk",
  "apps": {}
}
```

#### index.html

Copy and customize an existing `index.html` from another app (like w2g), or create your own with:
- Hero section with download button
- Features grid (12 features)
- How it works section (3 steps)
- Privacy/safety section
- Language switcher buttons

#### style.css

Copy from an existing app and customize:
- Color scheme in `:root` variables
- Any specific styling needs

### 5. Add Your APKs

```bash
# Add default APK
cp /path/to/your-default.apk ./yourapp_default.apk

# Add custom builds using the script
./add-apk.sh /path/to/custom-v1.apk "Version 1.0"
```

### 6. Test Locally

```bash
# Simple HTTP server
python3 -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000` in your browser.

### 7. Deploy to GitHub Pages

1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the branch/directory
4. Access at `https://yourusername.github.io/repo/appdir/`

## 📝 Template Details

### languages.js.template

**Purpose:** Multi-language support for your site

**Key Sections:**
- `translations` object - Contains all translations for each language
- `languageNames` - Native language names for the switcher
- `rtlLanguages` - Languages that read right-to-left

**Supported Languages:**
- English (en)
- Arabic (ar) - RTL
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Hindi (hi)
- Portuguese (pt)

**How to Add a New Language:**

1. Copy the `en` object
2. Translate all values
3. Add language code to `languageNames`
4. If RTL, add to `rtlLanguages`

### add-apk.sh.template

**Purpose:** Automated APK file management

**Features:**
- Validates APK files
- Generates unique 5-character codes
- Updates apks.json
- Provides shareable URLs
- Collision detection

**Requirements:**
- `jq` (JSON parser)

**Install jq:**
```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq
```

**Usage:**
```bash
./add-apk.sh <path-to-apk> [app-name]
```

**Example:**
```bash
./add-apk.sh ~/Downloads/myapp-v2.0.apk "Version 2.0 - Beta"
```

**Output:**
- Copies APK to current directory
- Adds entry to apks.json
- Generates unique code
- Shows shareable URL

### script.js.template

**Purpose:** Dynamic content loading and downloads

**Features:**
- URL parameter parsing (`?r=CODE`)
- Language detection and switching
- Download handling
- Animations
- Keyboard shortcuts
- Performance monitoring

**Configuration:**
```javascript
const CONFIG = {
    CONFIG_FILE: 'apks.json',     // Must match your config filename
    DOWNLOAD_TIMEOUT: 30000,       // Download timeout in milliseconds
    animationThreshold: 0.1,       // When to trigger animations
    animationRootMargin: '0px 0px -50px 0px'
};
```

**Keyboard Shortcuts:**
- `D` - Trigger download
- `S` - Scroll to features
- `H` - Scroll to hero

**URL Parameters:**
- `?r=CODE` - Load specific APK
- No parameter - Show default APK

## 🎨 Customization Tips

### Colors

Edit `style.css` `:root` variables:
```css
:root {
    --primary: #f59e0b;        /* Main brand color */
    --primary-light: #fbbf24;  /* Lighter variant */
    --primary-dark: #d97706;   /* Darker variant */
    --secondary: #8b5cf6;      /* Secondary color */
    --accent: #ec4899;         /* Accent color */
}
```

### Features

The templates support 12 features. Update them in:
1. `languages.js` - Feature titles and descriptions
2. `index.html` - Feature icons (emojis work well)

### Statistics

Update stats in `index.html`:
```html
<div class="stat">
    <span class="stat-number">500K+</span>
    <span class="stat-label">Happy Users</span>
</div>
```

## 🐛 Troubleshooting

### Script doesn't run
```bash
# Make it executable
chmod +x add-apk.sh
```

### jq not found
```bash
# Install jq
sudo apt-get install jq  # Debian/Ubuntu
brew install jq           # macOS
```

### Translations not showing
- Check browser console for errors
- Verify `languages.js` is loaded in `index.html`
- Ensure all translation keys exist

### Download doesn't start
- Check `apks.json` exists and is valid JSON
- Verify APK files exist in directory
- Check browser console for errors

## 📚 Examples

See the `w2g/` directory for a complete working example using these templates.

## 🤝 Contributing

To improve these templates:
1. Test with multiple apps
2. Document issues
3. Suggest improvements
4. Submit PRs

## 📄 License

Same as parent project.

---

**Need Help?** Check the working example in `../w2g/` or open an issue.

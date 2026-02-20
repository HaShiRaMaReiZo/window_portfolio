# Using real Windows 10 icons (including 7tsp pack)

The app uses **real Windows 10 icons** extracted from the system `imageres` file into `public/icons/*.ico`. Those are the only icons used (old SVG placeholders were removed).

## Getting the 7tsp pack icons into the app

The pack at  
`C:\Users\HP\Downloads\7tsp_windows_10_system_icons_by_ardentaa_dfe8n0v`  
uses compiled `.mun.res` files. The project **cannot read that format directly**. To use the pack’s icons:

1. **Apply the 7tsp pack**  
   Use [7tsp GUI](https://7tspgui.com/) to install the pack (Add pack → Start Patching, then restart if asked). That replaces the system icon file with the pack’s icons.

2. **Extract icons into the project**  
   On the same Windows PC, run:
   ```bash
   npm run extract-icons
   ```
   The script reads `C:\Windows\SystemResources\imageres.dll.mun` (or `System32\imageres.dll`) and writes:
   - `public/icons/folder.ico` (Projects)
   - `public/icons/thispc.ico` (This PC)
   - `public/icons/about.ico`, `resume.ico`, `skills.ico`, `contact.ico`

   After you’ve applied the 7tsp pack, that system file **is** the pack’s version, so the extracted `.ico` files will be the pack’s icons.

## If you don’t use 7tsp

Running `npm run extract-icons` without applying any pack simply extracts the **default Windows 10** icons. The app will still work and show real Win10 icons.

## Summary

- Icons in the app: **only** the `.ico` files in `public/icons/` (real Win10 or 7tsp after apply + extract).
- To switch to the 7tsp (ardentaa) set: apply the pack with 7tsp, then run `npm run extract-icons`.

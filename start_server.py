#!/usr/bin/env python3
"""
Simple HTTP server for testing the GAUSS website locally.
This script starts a local server and provides testing instructions.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    PORT = 8000
    
    print("🚀 Starting GAUSS Website Local Server")
    print("=" * 50)
    print(f"📁 Serving from: {script_dir}")
    print(f"🌐 Server URL: http://localhost:{PORT}")
    print()
    
    # Test URLs
    test_urls = [
        f"http://localhost:{PORT}/",
        f"http://localhost:{PORT}/test_navbar.html",
        f"http://localhost:{PORT}/blogs/home/",
        f"http://localhost:{PORT}/blogs/home/test_navbar.html",
        f"http://localhost:{PORT}/blogs/bench/",
        f"http://localhost:{PORT}/blogs/bench/test_navbar.html",
        f"http://localhost:{PORT}/blogs/eval/",
        f"http://localhost:{PORT}/blogs/eval/test_navbar.html",
    ]
    
    print("🧪 Test URLs:")
    for url in test_urls:
        print(f"   {url}")
    print()
    
    print("📋 Testing Instructions:")
    print("1. Open the URLs above in your browser")
    print("2. Check if the navbar appears on all pages")
    print("3. Open browser console (F12) to see debug messages")
    print("4. Verify navigation links work correctly")
    print("5. Test active state highlighting")
    print()
    print("🔍 Troubleshooting:")
    print("- If navbar doesn't appear, check console for errors")
    print("- Look for 'Navbar loaded successfully' or 'using embedded navbar' messages")
    print("- Verify all files are in the correct directories")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        # Create server
        Handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"✅ Server started successfully on port {PORT}")
            
            # Optionally open browser
            try:
                webbrowser.open(f"http://localhost:{PORT}/test_navbar.html")
                print("🌐 Opened test page in browser")
            except:
                print("⚠️  Could not auto-open browser")
            
            print("\n🔄 Server running... (Ctrl+C to stop)")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is already in use. Try a different port or stop the existing server.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

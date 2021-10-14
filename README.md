# Cryptex

[Crypt](https://crypt.hpfm.dev/) is a PWA which encrypts and decrypts your files offline using the Web Crypto APIs

Files are encrypted using AES GCM and a weak pbkdf algorithm (might improve in the future)


Cryptex also serves as a test bed for web perf strategies like aggressive preloading and prefetching (spinning up workers on mouse hover, preloading js before click etc)

Built with [ui-lib](https://github.com/hydrophobefireman/ui-lib), dss-js and [workbox](https://developers.google.com/web/tools/workbox)

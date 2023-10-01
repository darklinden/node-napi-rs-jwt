# Try Use napi-rs module to build a node jwt extension

* rust module is almost 2x speed of js module

```bash
js token: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaWQiOjEwMjQsImlhdCI6MTY5NjE0NDUzMCwiZXhwIjoxNjk2MTQ4MTMwfQ.xLmr_VvsyCQ69Qt3E-vrePfoTZ-uo1lmz7bYDb5UxTNLsVTMO2YbV_p_qerkCmH9xdOL4ABvM0uteVjbLDa8HA
js verify js token: {"pid":1024,"iat":1696144530,"exp":1696148130}
rust token: eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2OTYxNDgxMzAsImlhdCI6MTY5NjE0NDUzMCwicGlkIjoxMDI0fQ.Fj29K7OoNckAtWeLTaXshH0bZDGUQ2jo0m4d6JER_MpnOxYQ0jtsXdXta-6e6jIme8oACEv2Jfyt35-vmtPkFQ
rust verify rust token: {"exp":1696148130,"iat":1696144530,"pid":1024}
js verify rust token: {"exp":1696148130,"iat":1696144530,"pid":1024}
rust verify js token: {"exp":1696148130,"iat":1696144530,"pid":1024}
js signing 100000 times took 9136ms
js verifying 100000 times took 12789ms
rust signing 100000 times took 4198ms
rust verifying 100000 times took 6684ms
```

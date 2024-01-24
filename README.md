# CustomElementsBlazorSample

Here are the instructions to wire up custom elements to a blazor webassembly app. Note that most of these instructions are specific to the framework you are integrating into.

1. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client.esproj`, change the following line:
```
<BuildOutputFolder>$(MSBuildProjectDirectory)\dist\angularblazorcustomelementssample.client\</BuildOutputFolder>
```
to:
```
<BuildOutputFolder>$(MSBuildProjectDirectory)\dist\angularblazorcustomelementssample.client\browser</BuildOutputFolder>
```

2. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/clean.ps1`, add the following code:
```
if(Test-Path src/_framework) {
    Remove-Item src/_framework -Recurse -Force
}
```

3. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/prebuild.ps1`, add the following code:
```
Push-Location ..\AngularBlazorCustomElementsSample.WebAssembly;
dotnet publish -c Release;
New-Item -ItemType SymbolicLink -Force -Path ..\angularblazorcustomelementssample.client\src\_framework\ -Target (Resolve-Path .\bin\Release\net7.0\publish\wwwroot\_framework)
```

4. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/src/app/app.component.html`, add the following code:
```
<my-counter></my-counter>
```

5. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/src/app/app.component.ts`, add the following code:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

6. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/src/app/app.module.ts`, add the following code:
```
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
```

7. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/src/index.html`, add the following code:
```
<script src="_framework/blazor.webassembly.js"></script>
```

8. In the file `AngularBlazorCustomElementsSample.WebAssembly/angularblazorcustomelementssample.client/src/proxy.conf.js`, add the following code:
```
const PROXY_CONFIG = [
  {
    context: [
      "/_content",
      "/_framework",
      "/_blazor",
    ],
    proxyTimeout: 3000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
];
```
#!/usr/bin/env pwsh
Push-Location ..\AngularBlazorCustomElementsSample.WebAssembly;
dotnet publish -c Release;
New-Item -ItemType SymbolicLink -Force -Path ..\angularblazorcustomelementssample.client\src\_framework\ -Target (Resolve-Path .\bin\Release\net7.0\publish\wwwroot\_framework)

# SWAG API - Unity Plugin & Example

This example shows how to use the SWAG API with Unity. 

See [SwagAPI.cs](https://github.com/TeachMeInc/SWAG-API-Unity/blob/2021.3.3f/Assets/Plugins/WebGL/SwagAPI.cs) for a list of available plugin methods.

See [this PDF](https://github.com/TeachMeInc/SWAG-API-Unity/blob/2021.3.3f/SwagAPI/swag-api-developers%202.0.9.pdf) for more comprehensive documentation. (subject to change)

An end-to-end example can be found in this repository in the SampleScene scene.

## Setting up the scene using the SWAG template

1. Add a SwagObj to your scene. Make sure the SwagAPI script is attached.
2. Navigate to the WebGL player settings (Edit -> Project Settings -> Player -> WebGL settings) and choose the SWAGAPI template.
3. Navigate to the project build settings (File -> Build Settings) and choose the WebGL platform.
4. Build the project!

## Setting up the scene using a custom template

1. Add a SwagObj to your scene. Make sure the SwagAPI script is attached.
2. Add the following snippets of HTML to your template:

Just before the closing `</head>` tag:
```html
<script type="text/javascript" src="https://swagapi.shockwave.com/dist/swag-api.js"></script>   
<link rel="stylesheet" type="text/css" href="https://swagapi.shockwave.com/dist/swag-api.css"></link>
```

Just after the opening `<body>` tag (replacing the existing `<canvas>` tag):
```html
<div id="webgl" class="webgl-content">
  <div id="swag">
    <canvas id="unity-canvas" width={{{ WIDTH }}} height={{{ HEIGHT }}} style="width: {{{ WIDTH }}}px; height: {{{ HEIGHT }}}px; background: {{{ BACKGROUND_FILENAME ? 'url(\'Build/' + BACKGROUND_FILENAME.replace(/'/g, '%27') + '\') center / cover' : BACKGROUND_COLOR }}}"></canvas>
    <div class="footer">
      <div class="webgl-logo"></div>
      <div class="fullscreen" onclick="unityInstance && unityInstance.SetFullscreen(1)"></div>
      <div class="title">{{{ PRODUCT_NAME }}}</div>
    </div>
  </div>
</div>
```

Update your `createUnityInstance` call to initialize the SWAG API when ready:
```js
createUnityInstance(document.querySelector("#unity-canvas"), {
  ...
})
.then((unityInstance) => {
  window.unityInstance = unityInstance;

  document.swagBrandingShown = 0;
  SWAGAPI.showBrandingAnimation('webgl', function (){
    document.swagBrandingShown = 1;
  });
})
```

3. Navigate to the project build settings (File -> Build Settings) and choose the WebGL platform.
4. Build the project!

## Some notes about local development

1. The SWAG API is provided via a JSLIB external plugin. There is currently a quirk in Unity which prevents the plugin from working in editor mode, so you will need to build your project to test SWAG API features in your game.
2. SWAG API calls are secured via CORS and as such will only work properly in dev mode when coming from `local.addictinggames.com` or `local.shockwave.com` on ports 3000 or 8080. You will need to add these to your HOSTS file and run your game using an external web server to get passed CORS restrictions (ie Unity's "Build and Run" won't work for testing SWAG API features).


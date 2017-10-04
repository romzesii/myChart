/**
 * Created by Roman on 08.08.2017.
 */
System.config({
    //use typescript for compilation
    transpiler: 'typescript',
    //typescript compiler options
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    //map tells the System loader where to look for things
    map: {
        app: "./app",
        // '@angular/core': 'https://npmcdn.com/@angular/core@4.0.1/bundles/core.umd.js',
        '@angular/core': 'node_modules/@angular/core/bundles/core.umd.min.js',
        //'@angular/http': 'https://npmcdn.com/@angular/http@4.0.1/bundles/http.umd.js',
        '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
        '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
        '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
        '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/platform-browser': 'https://npmcdn.com/@angular/platform-browser@4.0.1/bundles/platform-browser.umd.js',
        '@angular/animations': 'https://npmcdn.com/@angular/animations@4.0.1/bundles/animations.umd.js',
        '@angular/platform-browser/animations': 'https://npmcdn.com/@angular/platform-browser@4.0.1/bundles/platform-browser-animations.umd.js',
        '@angular/animations/browser': 'https://npmcdn.com/@angular/animations@4.0.1/bundles/animations-browser.umd.js',
        '@angular/forms': 'https://npmcdn.com/@angular/forms@4.0.1/bundles/forms.umd.js',
        '@angular/router': 'https://npmcdn.com/@angular/router@4.0.1/bundles/router.umd.js',
        '@angular/material': 'node_modules/@angular/material/bundles/material.umd.js',
        '@angular/cdk/platform': 'node_modules/@angular/cdk/bundles/cdk-platform.umd.js',
        '@angular/cdk/a11y': 'node_modules/@angular/cdk/bundles/cdk-a11y.umd.js',
        '@angular/cdk/bidi': 'node_modules/@angular/cdk/bundles/cdk-bidi.umd.js',
        '@angular/cdk/coercion': 'node_modules/@angular/cdk/bundles/cdk-coercion.umd.min.js',
        '@angular/cdk/scrolling': 'node_modules/@angular/cdk/bundles/cdk-scrolling.umd.min.js',
        '@angular/cdk/keycodes': 'node_modules/@angular/cdk/bundles/cdk-keycodes.umd.min.js',
        '@angular/cdk/overlay': 'node_modules/@angular/cdk/bundles/cdk-overlay.umd.min.js',
        '@angular/cdk/portal': 'node_modules/@angular/cdk/bundles/cdk-portal.umd.min.js',
        '@angular/cdk/rxjs': 'node_modules/@angular/cdk/bundles/cdk-rxjs.umd.js',
        '@angular/cdk/collections': 'node_modules/@angular/cdk/bundles/cdk-collections.umd.js',
        '@angular/cdk/table': 'node_modules/@angular/cdk/bundles/cdk-table.umd.js',
        '@angular/cdk/observers': 'node_modules/@angular/cdk/bundles/cdk-observers.umd.js',
        '@angular/cdk/stepper': 'node_modules/@angular/cdk/bundles/cdk-stepper.umd.min.js',
        'rxjs': 'https://npmcdn.com/rxjs@5.0.0',
        'moment': 'https://npmcdn.com/moment',
        'd3-array': 'https://npmcdn.com/d3-array',
        'd3-brush': 'https://npmcdn.com/d3-brush',
        'd3-shape': 'https://npmcdn.com/d3-shape',
        'd3-selection': 'https://npmcdn.com/d3-selection',
        'd3-color': 'https://npmcdn.com/d3-color',
        'd3-drag': 'https://npmcdn.com/d3-drag',
        'd3-transition': 'https://npmcdn.com/d3-transition',
        'd3-format': 'https://npmcdn.com/d3-format',
        'd3-force': 'https://npmcdn.com/d3-force',
        'd3-dispatch': 'https://npmcdn.com/d3-dispatch',
        'd3-path': 'https://npmcdn.com/d3-path',
        'd3-ease': 'https://npmcdn.com/d3-ease',
        'd3-timer': 'https://npmcdn.com/d3-timer',
        'd3-quadtree': 'https://npmcdn.com/d3-quadtree',
        'd3-interpolate': 'https://npmcdn.com/d3-interpolate',
        'd3-scale': 'https://npmcdn.com/d3-scale',
        'd3-time': 'https://npmcdn.com/d3-time',
        'd3-collection': 'https://npmcdn.com/d3-collection',
        'd3-time-format': 'https://npmcdn.com/d3-time-format',
        'd3-hierarchy': 'https://npmcdn.com/d3-hierarchy',
        '@swimlane/ngx-charts': 'https://npmcdn.com/@swimlane/ngx-charts',
        'ngx-mydatepicker': 'node_modules/ngx-mydatepicker/bundles/ngx-mydatepicker.umd.min.js'

    },
    //packages defines our app package
    packages: {
        app: {
            main: './main.ts',
            defaultExtension: 'ts'
        },
        'rxjs': {
            main: './bundles/Rx.js'
        }
    }
});

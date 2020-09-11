declare module 'vue2-google-maps'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface GoogleMapsBase {
  maps: {
    Animation: google.maps.Animation
    BicyclingLayer: google.maps.BicyclingLayer
    Circle: google.maps.Circle
    Data: google.maps.Data
    DirectionsRenderer: google.maps.DirectionsRenderer
    DirectionsService: google.maps.DirectionsService
    DirectionsStatus: google.maps.DirectionsStatus
    DirectionsTravelMode: google.maps.TravelMode
    DirectionsUnitSystem: google.maps.UnitSystem
    DistanceMatrixElementStatus: google.maps.DistanceMatrixElementStatus
    DistanceMatrixService: google.maps.DistanceMatrixService
    DistanceMatrixStatus: google.maps.DistanceMatrixStatus
    ElevationService: google.maps.ElevationService
    ElevationStatus: google.maps.ElevationStatus
    FusionTablesLayer: google.maps.FusionTablesLayer
    Geocoder: google.maps.Geocoder
    GeocoderLocationType: google.maps.GeocoderLocationType
    GeocoderStatus: google.maps.GeocoderStatus
    GroundOverlay: google.maps.GroundOverlay
    ImageMapType: google.maps.ImageMapType
    InfoWindow: google.maps.InfoWindow
    KmlLayer: google.maps.KmlLayer
    KmlLayerStatus: google.maps.KmlLayerStatus
    LatLng: google.maps.LatLng
    LatLngBounds: google.maps.LatLngBounds
    MVCArray: google.maps.MVCArray<any>
    MVCObject: google.maps.MVCObject
    Map: google.maps.Map
    MapTypeControlStyle: google.maps.MapTypeControlStyle
    MapTypeId: google.maps.MapTypeId
    MapTypeRegistry: google.maps.MapTypeRegistry
    Marker: google.maps.Marker
    MarkerImage: any
    MaxZoomService: google.maps.MaxZoomService
    MaxZoomStatus: google.maps.MaxZoomStatus
    NavigationControlStyle: google.maps.MapTypeControlStyle // maybe
    OverlayView: google.maps.OverlayView
    Point: google.maps.Point
    Polygon: google.maps.Polygon
    Polyline: google.maps.Polyline
    Rectangle: google.maps.Rectangle
    SaveWidget: google.maps.SaveWidget
    ScaleControlStyle: google.maps.ScaleControlStyle
    Size: google.maps.Size
    StreetViewCoverageLayer: google.maps.StreetViewCoverageLayer
    StreetViewPanorama: google.maps.StreetViewPanorama
    StreetViewPreference: google.maps.StreetViewPreference
    StreetViewService: google.maps.StreetViewService
    StreetViewSource: google.maps.StreetViewSource
    StreetViewStatus: google.maps.StreetViewStatus
    StrokePosition: google.maps.StrokePosition
    StyledMapType: google.maps.StyledMapType
    SymbolPath: google.maps.SymbolPath
    TrafficLayer: google.maps.TrafficLayer
    TrafficModel: google.maps.TrafficModel
    TransitLayer: google.maps.TransitLayer
    TransitMode: google.maps.TransitMode
    TransitRoutePreference: google.maps.TransitRoutePreference
    TravelMode: google.maps.TravelMode
    UnitSystem: google.maps.UnitSystem
    ZoomControlStyle: google.maps.ZoomControlStyle
    event: any
    geometry: any
    version: string
  }
}

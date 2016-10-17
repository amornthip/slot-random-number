use Rack::Auth::Basic, "Restricted Area" do |username, password|
    [username, password] == ['admin', 'admin']
end

use Rack::Static,
  :urls => Dir.glob("dist/*").map { |fn| fn.gsub(/dist/, '')},
  :root => 'dist',
  :index => 'index.html',
  :header_rules => [[:all, {'Cache-Control' => 'public, max-age=3600'}]]

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'dist, max-age=86400'
    },
    File.open('dist/index.html', File::RDONLY)
  ]
}

Minipack.configuration do |c|
  # By default c.cache is set to `false`, which means an application always parses a
  # manifest.json. In development, you should set cache false usually.
  # Instead, setting it `true` which caches the manifest in memory is recommended basically.
  c.cache = !Rails.env.development?

  c.manifest = if Rails.env.development?
      "http://localhost:8080/manifest.json"
    else
      Rails.root.join("public", "assets", "manifests", "manifest.json")
    end
  c.base_path = Rails.root.join("client")
  c.build_command = "yarn build"
  c.pkg_install_command = "yarn install"
end

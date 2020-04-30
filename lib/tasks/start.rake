desc "Start development server with current vue"
task :start do
  # :nocov:
  exec "cd client && yarn install && foreman start -f ../Procfile.dev"
  # :nocov:
end

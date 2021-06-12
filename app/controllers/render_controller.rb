class RenderController < ApplicationController
    def welcome
        render(:layout => "layouts/welcome")
    end

    def login
        render(:layout => "layouts/login")
    end

    def home
        render(:layout => "layouts/home")
    end

    def chat
        render(:layout => "layouts/chat")
    end
end
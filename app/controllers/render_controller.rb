class RenderController < ApplicationController
    def welcome
        render(:layout => "layouts/welcome")
    end

    def login
        render(:layout => "layouts/login")
    end

    def home
        @rooms = Room.all
        print @rooms
        render(:layout => "layouts/home")
    end

    def chat
        render(:layout => "layouts/chat")
    end
end
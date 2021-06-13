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
        # host = Rooms.find_by(room_id: params[:room_id]).host
        @host = true
        render(:layout => "layouts/chat")
    end
end